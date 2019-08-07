import axios from 'axios'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faArrowLeft, faSave, faBan } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Button, Card, Modal, Alert } from 'react-bootstrap'

class Note extends React.Component {
  constructor () {
    super()

    this.state = {
      note: [],
      noteNotFound: false,
      showEditNoteModal: false,
      showDeleteNoteModal: false,
      showErrorMessage: false,
      errorMessageTitle: '',
      errorMessage: '',
      noteTitle: '',
      noteContent: ''
    }

    this.toggleEditNoteModal = this.toggleEditNoteModal.bind(this);
    this.toggleDeleteNoteModal = this.toggleDeleteNoteModal.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);

  }

  componentDidMount () {
    this.fetchNote();
  }

  fetchNote() {
    const noteId = this.props.match.params.id;
    axios.get(`/api/note/${noteId}`).then(response => {
      this.setState({
        note: response.data
      })
    })
    .catch(error => {
      return this.setState({
        noteNotFound: true
      });
    });
  }

  toggleEditNoteModal() {
    this.setState({
      showErrorMessage: false,
      errorMessageTitle: '',
      errorMessage: '',
      noteTitle: this.state.note.title,
      noteContent: this.state.note.content
    });
    this.setState(prevState => ({ showEditNoteModal: !prevState.showEditNoteModal }));
  }

  toggleDeleteNoteModal() {
    this.setState(prevState => ({ showDeleteNoteModal: !prevState.showDeleteNoteModal }));
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleEditSubmit() {
    if (this.state.noteTitle == '') {
      return this.setState({
        errorMessageTitle: "Oops! You forgot something.",
        errorMessage: "Your note needs a title! Please enter a title for your note below.",
        showErrorMessage: true
      });
    }

    if (this.state.noteContent == '') {
      return this.setState({
        errorMessageTitle: "Oops! You forgot something.",
        errorMessage: "Your note is empty! Please enter your note in the note content box below.",
        showErrorMessage: true
      });
    }

    axios.put(`/api/note/${this.state.note.id}`, {
      title: this.state.noteTitle,
      content: this.state.noteContent
    })
    .then(response => {

      if (!response.data.success) {
        return this.setState({
          errorMessageTitle: "Oops! Something went wrong.",
          errorMessage: "It's not you, it's us. Please try again.",
          showErrorMessage: true
        });
      }

      this.toggleEditNoteModal();
      this.fetchNote();
    })
    .catch(error => {
      return this.setState({
        errorMessageTitle: "Oops! Something went wrong.",
        errorMessage: "It's not you, it's us. Please try again.",
        showErrorMessage: true
      });
    });

  }

  handleDeleteSubmit() {

    const { history } = this.props;

    axios.delete(`/api/note/${this.state.note.id}`)
    .then(response => {
      history.push('/');
    })
    .catch(error => {
      return this.setState({
        errorMessageTitle: "Oops! Something went wrong.",
        errorMessage: "It's not you, it's us. Please try again.",
        showErrorMessage: true
      });
    });
  }

  render () {
    const { note } = this.state

    if (this.state.noteNotFound) {
      return (
        <Container>
          <Row>
            <div className="col-12">
              <Card className="shadow my-4 text-center">
                <Card.Body>
                  <h2 className="text-center my-4">Oops! That note could not be found. Please check the URL you entered and try again.</h2>
                  <Button href="/" variant="light" className="btn mt-2 btn-rounded"><FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Back To All Notes</Button>
                  </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
      )
    }

    return (
      <Container>
        <Row className="pt-3 pb-3 sticky-top dark-background">
          <div className="col-6 text-left">
            <Button href="/" variant="light" className="btn mt-2 btn-rounded"><FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> All Notes</Button>
          </div>
          <div className="col-6 text-right">
            <Button onClick={this.toggleEditNoteModal} variant="primary" className="mt-2 mr-2 btn btn-rounded"><FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit Note</Button>
            <Button onClick={this.toggleDeleteNoteModal} variant="danger" className="mt-2 btn btn-rounded"><FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete Note</Button>
          </div>
        </Row>
        <Card className="shadow mb-4">
          <Card.Body>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </Card.Body>
        </Card>

        <Modal show={this.state.showEditNoteModal} size="lg">
          <Modal.Header>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Alert variant="danger" show={this.state.showErrorMessage}>
              <Alert.Heading>{this.state.errorMessageTitle}</Alert.Heading>
              <p>{this.state.errorMessage}</p>
            </Alert>

            <input value={this.state.noteTitle} name="noteTitle" onChange={this.handleChange.bind(this)} className="w-100 form-control mb-2" placeholder="Note Title"/>
            <textarea value={this.state.noteContent} name="noteContent" onChange={this.handleChange.bind(this)} className="w-100 form-control" rows="8" placeholder="Note Content"/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleEditNoteModal}><FontAwesomeIcon icon={faBan} className="mr-1" /> Cancel</Button>
            <Button variant="primary" onClick={this.handleEditSubmit}><FontAwesomeIcon icon={faSave} className="mr-1" /> Update Note</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showDeleteNoteModal} size="lg">
          <Modal.Header>
            <Modal.Title>Are you sure you want to delete this note?</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Alert variant="danger" show={this.state.showErrorMessage}>
              <Alert.Heading>{this.state.errorMessageTitle}</Alert.Heading>
              <p>{this.state.errorMessage}</p>
            </Alert>

            <p><strong>Warning! Once you click the delete note button, this note will be permanently deleted.</strong></p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleDeleteNoteModal}><FontAwesomeIcon icon={faBan} className="mr-1" /> Cancel</Button>
            <Button variant="danger" onClick={this.handleDeleteSubmit}><FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete Note</Button>
          </Modal.Footer>
        </Modal>

      </Container>
    )
  }
}

export default Note
