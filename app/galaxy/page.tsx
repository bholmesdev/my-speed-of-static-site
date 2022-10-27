const sleep = (timeoutMs: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeoutMs);
  });

async function getGalaxyInfo(): Promise<{
  title: string;
  explanation: string;
  hdurl: string;
}> {
  await sleep(2000);
  return await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=" + process.env.NASA_API_KEY ??
      "DEMO_KEY",
    {
      next: { revalidate: 0 },
    }
  ).then((res) => res.json());
}

export default async function Galaxy() {
  const response = await getGalaxyInfo();
  console.log("server!");
  return (
    <article>
      <h1>{response.title}</h1>
      <p>{response.explanation}</p>
      <img src={response.hdurl} alt={response.title} width={500} height={300} />
    </article>
  );
}
