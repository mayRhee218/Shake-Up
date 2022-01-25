package com.shakeup.service;

import com.shakeup.model.BasicResponse;
import com.shakeup.model.Users;
import com.shakeup.repository.UserRepository;
import com.shakeup.request.UserChangeInfoRequest;
import com.shakeup.request.UserResetPwdRequest;
import com.shakeup.request.UserSendpwRequest;
import com.shakeup.request.UserSignUpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;

<<<<<<< HEAD
    public  BasicResponse login(String id, String password){
=======
    public BasicResponse login(String id, String password) {
>>>>>>> c8c53a1f0c1e5aa624834643f85d08ea7703362e
        Optional<Users> userOpt = userRepository.findUserByIdAndPassword(id, password);

        if (userOpt.isPresent()) {
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.data = "success";
            return result;
        }
        return null;
    }

    public Optional<Users> findByEmail(String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        return user;
    }

    public String sendPw(UserSendpwRequest userSendpwRequest) {
        Users user = userSendpwRequest.toEntity();
        Optional<Users> checkId = userRepository.findById(user.getId());
        Optional<Users> checkEmail = userRepository.findByEmail(user.getEmail());
        if (!checkId.isPresent() || !checkEmail.isPresent()) {
            return "값 없음.";
        }

        String tempPwd = getRamdomPassword(10);
        checkId.ifPresent(selectUser -> {
            selectUser.setPassword(tempPwd);

            userRepository.save(selectUser);
        });

        // 수신 대상을 담을 ArrayList 생성
        ArrayList<String> toUserList = new ArrayList<>();

        // 수신 대상 추가
        toUserList.add(user.getEmail());

        // 수신 대상 개수
        int toUserSize = toUserList.size();

        // SimpleMailMessage (단순 텍스트 구성 메일 메시지 생성할 때 이용)
        SimpleMailMessage simpleMessage = new SimpleMailMessage();

        // 수신자 설정
        simpleMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));

        // 메일 제목
        simpleMessage.setSubject("[임시 비밀번호 안내] 단람쥐와 도토리들 입니다.");

        // 메일 내용
        simpleMessage.setText("해당 10자리 임시비밀번호는 " + tempPwd + "입니다.");
        // 메일 발송
        javaMailSender.send(simpleMessage);

        return tempPwd;
    }

    public static String getRamdomPassword(int len) {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        int idx = 0;
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < len; i++) {
            idx = (int) (charSet.length * Math.random()); // 36 * 생성된 난수를 Int로 추출 (소숫점제거)
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    public String resetPw(UserResetPwdRequest userResetPwdRequest) {
        Users tempuser = userResetPwdRequest.toEntity();
        Optional<Users> checkUid = userRepository.findByUid(tempuser.getUid());
        if (!checkUid.isPresent() || checkUid.get().getPassword().equals(tempuser.getPassword())) {
            return "fail";
        }
        checkUid.get().setPassword(tempuser.getPassword());
        userRepository.save(checkUid.get());
        return "success";
    }

    public String signUp(UserSignUpRequest userSignUpRequest) {
        Users tempuser = userSignUpRequest.toEntity();
        userRepository.save(tempuser);
        return "success";
    }

    public String checkId(String id) {
        Optional<Users> user = userRepository.findById(id);
        System.out.println(user);
        if (user.isPresent()) {
            return "fail";
        } else {
            return "success";
        }
    }

    public String checkName(String name) {
        Optional<Users> user = userRepository.findByName(name);
        System.out.println(user);
        if (user.isPresent()) {
            return "fail";
        } else {
            return "success";
        }
    }

    public String changeinfo(UserChangeInfoRequest userChangeInfoRequest) {
        Users tempuser = userChangeInfoRequest.toEntity();
        Optional<Users> checkUid = userRepository.findById(tempuser.getId());
        if (!checkUid.isPresent() || checkUid.get().getPassword().equals(tempuser.getPassword())) {
            return "fail";
        }
        checkUid.get().setName(tempuser.getName());
        checkUid.get().setProfile(tempuser.getProfile());
        userRepository.save(checkUid.get());
        return "success";
    }

    public String deleteUser(String id) {
        Optional<Users> user = userRepository.findById(id);

        if (user.isPresent()) {
            userRepository.deleteById(user.get().getUid());
            return "success";
        }
        return "fail";
    }
}


