# Micro Frontend Sub Module
## 패키지명의 수정
1. package.json 의 <span style="color: #fc8621">[name]</span> 을 수정하십시오.
<code><pre>
{
&nbsp;&nbsp;...
&nbsp;&nbsp;"name": "[name]",
&nbsp;&nbsp;...
}
</pre></code>
2. bundler 의 packages 명령을 호출하십시오.
<code><pre>
&gt; yarn packages ↵
</pre></code>
## 모듈 코드의 수정
- package.json 의 <span style="color: #fc8621">[moduleCode]</span> 를 수정하십시오.
<code><pre>
{
&nbsp;&nbsp;...
&nbsp;&nbsp;"moduleCode": "[moduleCode]",
&nbsp;&nbsp;"homepage": "/modules/[moduleCode]"
&nbsp;&nbsp;...
}
</pre></code>
- src/index.js 의 initialize 함수 호출 부분의 <span style="color: #fc8621">[moduleCode]</span>  를 수정하십시오.
<code><pre>
import MicroModule from 'klago-ui-micro-common';
import Pages from './Pages';
MicroModule.initialize('[moduleCode]', Pages);
</pre></code>