/** @format */

export const downloadFile = async (file: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/download/${file}`
    );
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (error) {
    console.log(error);
  }
};
