import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FileModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Details of file
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Some files are here
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

// class StudentModalComponent extends Component<StudentPropType> {
//     constructor(props: StudentPropType) {
//         super(props);
//     }

//     handleFileUpload(e: any) {
//         this.props.handleFileUpload(e.target.files[0])
//     }

//     render(): React.ReactNode {
//         return <Modal show={this.props.show}>
//             <Modal.Header closeButton onClick={this.props.onHide}>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Details of Student {this.props.config[1].value}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 {this.props.form}
//             </Modal.Body>
//             <Modal.Footer>
//                 <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
//                     <Form.Group controlId="formFile" className="mb-3" onChange={(e) => this.handleFileUpload(e)}>
//                         <Form.Control type="file" />
//                     </Form.Group>
//                 </div>
//                 <div style={{display: 'flex', width: '45%', justifyContent: 'space-between'}}>
//                     <Button onClick={this.props.onSave}>Save</Button>
//                     <Button onClick={this.props.onHide}>Delete</Button>
//                     <Button onClick={this.props.onHide}>Close</Button>
//                 </div>
//             </Modal.Footer>
//         </Modal>
//     }
// }

// export default withForm(StudentModalComponent);
