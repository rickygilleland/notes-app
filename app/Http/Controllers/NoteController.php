<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;

class NoteController extends Controller
{

	public function get_all_notes()
	{

		$notes = \App\Note::orderBy('updated_at', 'desc')->get();

		foreach ($notes as $note) {

			$note->preview_content = substr($note->content, 0, 200);

			if (strlen($note->content) > 200) {
				$note->preview_content = $note->preview_content . "...";
			}

		}

		return $notes;

	}

	public function get_note($id)
	{

		$note = \App\Note::find($id);

		if (!$note) {
			return Response::json(['success' => false], 404);
		}

		return $note;

	}

	public function create_note(Request $request)
	{

		$request->validate([
        'title' => 'required|max:255',
        'content' => 'required|max:5000',
    ]);

		$note = new \App\Note();
		$note->title = $request->title;
		$note->content = $request->content;

		if ($note->save()) {
			return ['success' => true];
		}

		return ['success' => false];
	}

	public function update_note(Request $request, $id)
	{

		$request->validate([
        'title' => 'required|max:255',
        'content' => 'required|max:5000',
    ]);

		$note = \App\Note::find($id);

		if (!$note) {
			return Response::json(['success' => false], 404);
		}

		$note->title = $request->title;
		$note->content = $request->content;

		if ($note->save()) {
			return ['success' => true];
		}

		return ['success' => false];

	}

	public function delete_note($id)
	{

		$note = \App\Note::find($id);

		if (!$note) {
			return Response::json(['success' => false], 404);
		}

		if ($note->delete()) {
			return ['success' => true];
		}

		return ['success' => false];

	}

}
