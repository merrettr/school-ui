import React  from 'react';
import { connect } from 'react-redux';
import { uploadStudentsFile } from '../actions';
import Spinner from '../components/Spinner';
import FileUpload from '../components/FileUpload';
import UploadResults from '../components/UploadResults';
import Error from '../components/Error';

const AdminStudentPage = ({ response, isUploading, error, onUploadFile }) => {
  if (isUploading) {
    return <Spinner />;
  }

  return <div>
    <FileUpload onFileSelect={onUploadFile}/>
    <Error message={error} />
    {response && response.wasSuccess && <UploadResults {...response} />}
  </div>;
};

const mapStateToProps = ({
  students: { upload: { response, error, isUploading } },
}) => ({
  response,
  isUploading,
  error,
});

export default connect(mapStateToProps, {
  onUploadFile: uploadStudentsFile,
})(AdminStudentPage);