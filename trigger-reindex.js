async function main() {
  const loginRes = await fetch('http://localhost:3000/admin-api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            __typename
            ... on CurrentUser {
              id
              identifier
            }
            ... on ErrorResult {
              errorCode
              message
            }
          }
        }
      `,
      variables: { username: 'superadmin', password: 'StrongAdminPass123!' }
    }),
  });

  const loginJson = await loginRes.json();
  console.log('Login JSON:', JSON.stringify(loginJson));
  console.log('Headers:', Array.from(loginRes.headers.entries()));

  const authToken = loginRes.headers.get('vendure-auth-token');
  const setCookie = loginRes.headers.get('set-cookie');
  console.log('Login status:', loginRes.status, 'Auth token:', authToken);

  const headers = {
    'Content-Type': 'application/json',
    'vendure-auth-token': authToken,
    'Authorization': `Bearer ${authToken}`
  };

  const reindexRes = await fetch('http://localhost:3000/admin-api', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        mutation {
          reindex {
            id
            state
            progress
          }
        }
      `
    })
  });
  const reindexData = await reindexRes.json();
  console.log('Reindex Job Triggered:', JSON.stringify(reindexData));

  // Poll for job completion
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const jobCheck = await fetch('http://localhost:3000/admin-api', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `query { jobs(options: { take: 5, sort: { id: DESC } }) { items { id queueName state progress result error } } }`
      })
    });
    const checkJson = await jobCheck.json();
    const latest = checkJson.data?.jobs?.items?.[0];
    console.log(`Job ${latest?.id} (${latest?.queueName}): ${latest?.state}, progress: ${latest?.progress}%`);
    if (latest?.state === 'COMPLETED' || latest?.state === 'FAILED') {
      console.log('Finished with result:', latest?.result, latest?.error);
      break;
    }
  }

  // Check shop-api search
  const searchRes = await fetch('http://localhost:3000/shop-api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          search(input: { take: 10 }) {
            totalItems
            items {
              productName
              slug
              priceWithTax {
                ... on SinglePrice {
                  value
                }
              }
            }
          }
        }
      `
    })
  });
  const searchJson = await searchRes.json();
  console.log('Shop Search Result:', JSON.stringify(searchJson, null, 2));
}

main().catch(console.error);
