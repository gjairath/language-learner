import Alert from 'react-bootstrap/Alert';

const Message = ({type,content,deleteFlash}) => {
  return (
<Alert variant={type} onClose={deleteFlash} style={{textAlign: 'center', fontSize: '19px'}}>
  {content}
</Alert>
  );
};

export default Message