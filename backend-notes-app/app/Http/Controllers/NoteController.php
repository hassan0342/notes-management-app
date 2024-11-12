<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
    
        $search = $request->get('search');
        if ($search) {
            $notes = Note::where('title', 'like', '%' . $search . '%')
                         ->orWhere('content', 'like', '%' . $search . '%')
                         ->paginate(10); 
        } else {
            $notes = Note::paginate(10);
        }
        return response()->json($notes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note = Note::create($request->all());
        return response()->json($note, 201);
    }
    public function show($id)
    {
        $note = Note::findOrFail($id);
        return response()->json($note);
    }

    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note->update($request->all());
        return response()->json($note);
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();
        return response()->json(null, 204);
    }
}
