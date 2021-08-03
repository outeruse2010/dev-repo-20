/*******************Example ************************* */

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  // postData('https://example.com/answer', { answer: 42 })
  //   .then(data => {
  //     console.log(data); // JSON data parsed by `data.json()` call
  //   });


/********************************************* */


export const api_url = (url) => ("http://127.0.0.1:5000/"+url); 

export const post_request = (url, json_input = {}) =>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const api = api_url(url);

    const postRequest = new Request(api, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            cache: 'default',
            body:  JSON.stringify(json_input)
        });
    return postRequest;
}

export const fetch_graphql_post = (url, query) => {
    const api = api_url(url);
    let response = {};

        fetch(api, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: query
                    })
                } ).then(res => res.json)
                .then(data=> {console.log('****data: ',data); response = data;})
                .catch(err => console.log(err));
    return response;

}


