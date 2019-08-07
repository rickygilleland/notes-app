import axios from 'axios'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBan, faSave } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Button, Card, Modal, Alert } from 'react-bootstrap'

class NotesList extends React.Component {
  constructor () {
    super()

    this.state = {
      notes: [],
      showCreateNoteModal: false,
      showErrorMessage: false,
      errorMessageTitle: '',
      errorMessage: '',
      noteTitle: '',
      noteContent: ''
    }

    this.toggleAddNoteModal = this.toggleAddNoteModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount () {
    this.fetchAllNotes();
  }

  fetchAllNotes() {
    axios.get('/api/notes').then(response => {
      this.setState({
        notes: response.data
      })
    })
  }

  toggleAddNoteModal() {
    this.setState(prevState => ({ showCreateNoteModal: !prevState.showCreateNoteModal }));

    if (!this.state.showCreateNoteModal) {
      this.setState({
        showCreateNoteError: false,
        createNoteErrorMessage: '',
        noteTitle: '',
        noteContent: ''
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleSubmit() {

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

    axios.post('/api/note', {
      title: this.state.noteTitle,
      content: this.state.noteContent
    })
    .then(response => {
      this.toggleAddNoteModal();
      this.fetchAllNotes();
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
    const { notes } = this.state


    return (
      <Container>
        <Row className="pt-3 dark-background sticky-top">
          <div className="col-6 text-left">
            <h1>Notes</h1>
          </div>
          <div className="col-6 text-right">
            <Button onClick={this.toggleAddNoteModal} variant="primary" className="mt-2 btn btn-rounded"><FontAwesomeIcon icon={faPlus} className="mr-1" /> New Note</Button>
          </div>
        </Row>

        {notes.length == 0 &&
          <Row>
            <div className="col-12">
              <Card className="shadow mb-4">
                <Card.Body>
                  <h2 className="text-center ">You do not have any notes yet. Press the new note button to create your first note.</h2>
                </Card.Body>
              </Card>
            </div>
          </Row>
        }

        {notes.map(note => (
          <Card className="shadow mb-4" key={note.id}>
            <Card.Body>
              <Row>
                <div className="col-md-10 col-12">
                  <h2 className="h5">{note.title}</h2>
                  <p>{note.preview_content}</p>
                </div>
                <div className="col-md-2 col-12">
                  <Button href={`${note.id}`}  variant="light" className="btn mt-3 btn-rounded btn-block">View Note</Button>
                </div>
              </Row>
            </Card.Body>
          </Card>
        ))}

        <Modal show={this.state.showCreateNoteModal} size="lg">
          <Modal.Header>
            <Modal.Title>Add a New Note</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Alert variant="danger" show={this.state.showErrorMessage}>
              <Alert.Heading>{this.state.errorMessageTitle}</Alert.Heading>
              <p>{this.state.errorMessage}</p>
            </Alert>

            <label>Enter your new note below.</label>
            <input value={this.state.noteTitle} name="noteTitle" onChange={this.handleChange.bind(this)} className="w-100 form-control mb-2" placeholder="Note Title"/>
            <textarea value={this.state.noteContent} name="noteContent" onChange={this.handleChange.bind(this)} className="w-100 form-control" rows="8" placeholder="Note Content"/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleAddNoteModal}><FontAwesomeIcon icon={faBan} className="mr-1" /> Cancel</Button>
            <Button variant="primary" onClick={this.handleSubmit}><FontAwesomeIcon icon={faSave} className="mr-1" /> Add Note</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

export default NotesList
