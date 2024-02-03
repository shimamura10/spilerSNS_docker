<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Events\MessageSent;

class ChatController extends Controller
{
    // チャット画面の表示
    public function index(User $oponent)
    {
        return Inertia::render("Chat/Index", ["oponent" => $oponent]);
    }

    // メッセージの取得
    public function fetchMessages(User $oponent)
    {
        $user_id = Auth::user()->id;
        $oponent_id = $oponent->id;

        $messages = Message::with(['author', 'oponent'])->where(function ($query) use (&$user_id, &$oponent_id) {
                        $query->where('author_id', '=', $user_id)->where('oponent_id', '=', $oponent_id);
                    })->orwhere(function ($query) use (&$user_id, &$oponent_id) {
                        $query->where('author_id', '=', $oponent_id)->where('oponent_id', '=', $user_id);
                    })->get();
        return $messages;
    }

    // メッセージの送信
    public function sendMessage(Request $request, Message $message)
    {
        $input = $request->all();
        $message->fill($input);
        $message->author_id = Auth::user()->id;
        $message->save();

        broadcast(new MessageSent(Auth::user(), $input["oponent_id"], $message))->toOthers();
        // $message = $user->messages()->create([
        //     'message' => $request['message'],
        //     'oponent_id' => $request['oponent_id'],
        // ]);
    }
}
