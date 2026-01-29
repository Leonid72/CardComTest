1) Incorrect dependency on useEffect (data dependency)
The effect depends on `data`, but inside the effect you call `setData`.
This creates a loop: `setData` changes `data` → triggers the effect again → another fetch → another setData, etc.
Results: unnecessary network calls, load, UI

2) Lack of error handling/request cancellation
There is no `catch`/error handling and no request cancellation when a component is broken or when there is a new request.
Results: “silent” errors, unclear loading status, and risk of state update after unmount.


useEffect(() => {
  const controller = new AbortController();

  (async () => {
    try {
      const res = await fetch("/api/data", { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to fetch:", err);
      }
    }
  })();

  return () => controller.abort();
}, []); 