function MediaRenderer({ url }) {
  if (!url) return null;

  const ext = url.split(".").pop().toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return <img src={url} alt="media" className="w-full max-h-96 object-contain rounded" />;
  }

  if (["mp4", "webm", "ogg"].includes(ext)) {
    return (
      <video controls className="w-full max-h-96 rounded">
        <source src={url} type={`video/${ext}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (ext === "pdf") {
    return (
      <iframe
        src={url}
        title="PDF preview"
        className="w-full h-[500px] border rounded"
      ></iframe>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View attachment
    </a>
  );
}


export default MediaRenderer