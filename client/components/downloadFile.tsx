"use client";

import { downloadFile } from "@/services/downloadFile";
import { IFile } from "@/types/common";
import { FC } from "react";

type DownloadFileProps = {
  file: IFile;
};

const DownloadFile: FC<DownloadFileProps> = ({ file }) => {
  return (
    <>
      <p className="mb-1">
        Attached file:{file.filename}
        {/* {file.filename.slice(0, 10) + "...pdf"} */}
      </p>
      <button
        className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => downloadFile(file.filename)}
      >
        Download file
      </button>
    </>
  );
};

export default DownloadFile;
