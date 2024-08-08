<div>
{{$request->user_name}}さんからお問い合わせが来ています。<br>
以下のメールアドレスをクリックして返信をお願いします。

<p>▼お問い合わせ内容<br>
お名前: {{$request->user_name}} <br>
メールアドレス: {{$request->user_email}} <br>
件名: {{$request->subject}} <br>
内容: {{$request->content}} <br>
</p>
</div>
