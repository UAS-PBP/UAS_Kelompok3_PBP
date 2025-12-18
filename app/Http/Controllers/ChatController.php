<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Product;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $msg = $request->message;

        // Jika pertanyaan tentang rekomendasi rumah, pakai OpenAI + database
        if (str_contains(strtolower($msg), 'rumah') || str_contains(strtolower($msg), 'rekomendasi')) {

            $products = Product::where('name', 'LIKE', "%$msg%")
                ->orWhere('description', 'LIKE', "%$msg%")
                ->limit(3)
                ->get();

            $productList = $products->isEmpty()
                ? "No products found."
                : $products->map(fn($p) => "- {$p->name} | {$p->description} | {$p->price}")->implode("\n");

            $response = Http::withToken(env('OPENAI_API_KEY'))
                ->post("https://api.openai.com/v1/chat/completions", [
                    "model" => "gpt-4o-mini",
                    "messages" => [
                        ["role" => "system", "content" => "You are an ecommerce assistant that recommends products using the provided product list."],
                        ["role" => "user", "content" => "User query: $msg \n Product list:\n$productList"],
                    ]
                ]);

            return response()->json([
                "assistant" => $response['choices'][0]['message']['content'] ?? null,
                "products_found" => $products
            ]);

        } else {

            // Pakai DeepSeek untuk general chat
            $response = Http::post("https://api.deepseek.com/v1/chat/completions", [
                "model" => "deepseek-chat",
                "messages" => [
                    ["role" => "system", "content" => "You are a helpful conversational assistant."],
                    ["role" => "user", "content" => $msg],
                ]
            ]);

            return response()->json([
                "assistant" => $response['choices'][0]['message']['content'] ?? null
            ]);
        }
    }
}