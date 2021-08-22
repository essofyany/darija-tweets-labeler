export async function labelTweet(data) {
  try {
    await fetch("/api/server", {
      method: "POST",
      body: JSON.stringify(data),
    });
    // alert("tweet is labeled successfully");
  } catch (error) {
    throw new Error("something went wrong!!!!!");
  }
}

export async function labelTokens(data) {
  try {
    await fetch("/api/server", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    // alert("tweet is labeled successfully");
  } catch (error) {
    throw new Error("something went wrong!!!!!");
  }
}
