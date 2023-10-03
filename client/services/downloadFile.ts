/** @format */

export const downloadFile = async (file: string) => {
  const response = await fetch(`http://localhost:4000/api/download/${file}`);
  if (response.status === 200) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
