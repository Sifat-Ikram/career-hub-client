import { useContext, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';

function FileUpload() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const axiosPublic = useAxiosPublic();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('email', user.email);
      await axiosPublic.post('/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(formData);
    } catch (error) {
      alert('Error uploading PDF');
    }
  };

  return (
    <div className='flex justify-center items-center gap-2'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className='btn'>Upload</button>
    </div>
  );
}

export default FileUpload;
