import { NextResponse } from "next/server";

// チャットのメッセージを格納する配列
let chatMessages = [
    {
        id: 1,
        role: "bot",
        message: "こんにちは！",
    },
];

export async function GET() {
    return NextResponse.json(chatMessages);
}

// POSTリクエストを処理する関数
export async function POST(request) {
    // リクエストのボディからデータを取得
    const data = await request.json();

    // 新しいメッセージオブジェクトを作成
    const newMessage = {
        id: chatMessages.length + 1,
        role: data.role || "user",
        message: data.message,
    };
    // 新しいメッセージをChatMessages配列に追加
    chatMessages.push(newMessage);

    // ユーザーと同じメッセージをbotメッセージとしてchatMessages配列に追加
    chatMessages.push({
        id: chatMessages.length + 1,
        role: "bot",
        message: data.message,
    });

    // 更新されたメッセージリスト全体をレスポンスする
    return NextResponse.json(chatMessages);

}