export function generateKey(id) {
  return `${id}_${new Date().getTime()}_${Math.random()}`;
}

// fetch method implementation
export async function getFetch(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// CJA: PUT method implementation
// export async function patchFetch(url = "") {
// 	const headersParams = token
// 		? {
// 				"Content-Type": "application/json",
// 				Authorization: "",
// 		  }
// 		: {
// 				"Content-Type": "application/json",
// 		  };

// 	// Default options are marked with *
// 	const response = await fetch(url, {
// 		method: "PATCH", // *GET, POST, PUT, DELETE, etc.
// 		mode: "cors", // no-cors, *cors, same-origin
// 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// 		credentials: "same-origin", // include, *same-origin, omit
// 		headers: headersParams,
// 		redirect: "follow", // manual, *follow, error
// 		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// 		body: JSON.stringify(data), // body data type must match "Content-Type" header
// 	});
// 	return response.json(); // parses JSON response into native JavaScript objects
// }
