<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Chat;

class ChatbotController extends Controller
{
    
    public function chat(Request $request)
    {
        


 
        $request->validate([
            'message' => 'required|string'
        ]);

        $userMessage = $request->message;

        // Simpan pesan user
        Chat::create([
            'sender' => 'user',
            'message' => $userMessage,
        ]);

        // Kirim ke OpenRouter
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'HTTP-Referer' => 'http://localhost', // WAJIB
            'X-Title' => 'HomeLinkID Chatbot',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => 'deepseek/deepseek-chat', // ✅ FREE
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Kamu adalah asisten AI HomeLinkID. Jawab hanya seputar properti, rumah, harga, dan penjual.'
                ],

                [
                    'role' => 'user',
                    'content' => $userMessage
                ]
            ]
        ]);

        if (!$response->successful()) {
    return response()->json([
        'error' => $response->json(),
        'status' => $response->status()
    ], 500);
}

        $data = $response->json();

$aiReply = data_get($data, 'choices[0].message.content')
    ?? 'Maaf, AI tidak memberikan jawaban.';


        // Simpan balasan AI
        Chat::create([
            'sender' => 'ai',
            'message' => $aiReply,
        ]);

        return response()->json([
            'reply' => $aiReply
        ]);
    }
}
