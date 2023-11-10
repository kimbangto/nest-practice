import { ISendMailOptions } from '@nestjs-modules/mailer';

export const mailTemplate = (
  userEmail: string,
  code: string,
): ISendMailOptions => {
  return {
    from: '일기에게', // 보내는 사람
    to: userEmail, // 받는 주소
    subject: '[📕일기에게] 이메일 확인 인증링크입니다.', // 이메일 제목
    html: `<h3>아래 링크를 클릭하여 이메일 주소 인증을 완료해 주세요.</h3>
          <p>🚨가입중인 사람이 본인이 아니라면 절대 링크를 클릭하지 말아주세요!🚨</p>
          <p>클릭해서 이메일 인증하기 👉 <a href="http://localhost:4000/mail-auth/check?userEmail=${userEmail}&authCode=${code}" target="_blank">메일 인증하기</a></p>
          <p>이 링크는 30분간 유효합니다.</p>
          <p>문의주실 곳 👉 ${process.env.MAIL_USER}</p>
            `, // 이메일 내용};
  };
};
