import { useRef, useState } from 'react';

function DragAndDropUpload(props: any) {
  const inputFileRef = useRef();
  const [isOnDrag, setIsOnDrag] = useState<boolean>(false);
  const { setPreviewImage, register, setValue, errors } = props;

  const onFileChangeCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    /*Selected files data can be collected here.*/
    // console.log(e.target.files);
    if (e && e.target.files && e.target.files.length > 0) {
      const currentFile = e.target.files[0];
      setValue('mediafile', currentFile);
      const reader = new FileReader();
      reader.readAsDataURL(currentFile);
      reader.onloadend = () => {
        props.setPreviewImage(reader.result);
      };
    }
  };

  const handleUploadClick = () => {
    /*Collecting node-element and performing click*/
    if (inputFileRef && inputFileRef.current) {
      (inputFileRef.current as HTMLInputElement).click();
    }
  };

  const handleFileInputChange = (e: any) => {
    // handle file input change
    //console.log(e.target.files[0]);
    if (e && e.target.files && e.target.files.length > 0) {
      const currentFile = e.target.files[0];
      setValue('mediafile', currentFile);
      const reader = new FileReader();
      reader.readAsDataURL(currentFile);
      reader.onloadend = () => {
        props.setPreviewImage(reader.result);
      };
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOnDrag(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOnDrag(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOnDrag(false);
    if (e && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // handle dropped file
      const currentFile = e.dataTransfer.files[0];
      //console.log(e.dataTransfer.files[0]);

      setValue('mediafile', currentFile);

      const reader = new FileReader();
      reader.readAsDataURL(currentFile);
      reader.onloadend = () => {
        props.setPreviewImage(reader.result);
      };
    }
  };

  return (
    <div className="w-full h-full bg-[#D9D9D9]">
      <div
        className={`${
          isOnDrag
            ? 'mt-1 flex justify-center rounded-md border-2 border-solid border-gray-300 bg-slate-100 px-6 pb-6 pt-5 opacity-60'
            : 'mt-1 flex justify-center rounded-md border-2 border-solid border-gray-300 px-6 pb-6 pt-5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-6 text-center">
          <div className="flex text-sm text-gray-600 items-center justify-center w-[400px] h-[200px]">
            <label
              htmlFor="media"
              className="relative cursor-pointer rounded-md font-medium text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2 hover:text-gray-500"
            >
              <span onClick={() => handleUploadClick()}>
              Cover image preview
              </span>
              <input
                id="mediafile"
                type="file"
                className="sr-only"
                onChange={(e) => handleFileInputChange(e)}
                onChangeCapture={onFileChangeCapture}
                {...register('mediafile', { required: true })}
                ref={inputFileRef}
              />
            </label>
          </div>
          {errors.mediafile && (
            <p className="text-sm text-red-500">
              Cover image preview
            </p>
          )}
          <p className="text-center text-xs text-gray-500">
            PNG, GIF, WEBP or JPEG. Max 3mb
          </p>
        </div>
      </div>
    </div>
  );
}

export default DragAndDropUpload;
