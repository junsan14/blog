

<div>
{{$request->user_name}}様
<p>お問い合わせ頂きましてありがとうございます｡</p>
<p>以下の内容でお問い合わせを受け付けました｡</p>
<p>返信には数日頂く可能性があること､予めご了承頂けると幸いです｡</p>

<p>▼お問い合わせ内容<br>
お名前: {{$request->user_name}} <br>
件名: {{$request->subject}} <br>
内容: {{$request->content}} <br>
</p>
</div>

