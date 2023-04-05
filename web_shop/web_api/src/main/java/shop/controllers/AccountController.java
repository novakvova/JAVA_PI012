package shop.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.configuration.security.GoogleTokenVerifier;
import shop.dto.account.GoogleAuthDto;
import shop.dto.account.LoginDto;
import shop.dto.account.AuthResponseDto;
import shop.dto.account.RegisterDto;
import shop.services.AccountService;



@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;
    private final GoogleTokenVerifier googleTokenVerifier;


    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @RequestBody RegisterDto request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/google-auth")
    public ResponseEntity<AuthResponseDto> googleLogin(
            @RequestBody GoogleAuthDto googleAuth)  {
        try {
            var result = googleTokenVerifier.verify(googleAuth.getToken());
            AuthResponseDto response = new AuthResponseDto().builder()
                    .token(result.getEmail())
                    .build();
            return ResponseEntity.ok(response);

        }
        catch(Exception ex) {

        }
                    AuthResponseDto result = new AuthResponseDto().builder()
                    .token("")
                    .build();
        return ResponseEntity.ok(result);
//        try {
//            // get id_token from Authorization Bearer
//            String token = googleAuth.getToken();
//
//            // Create verifier
//            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, factory)
//                    .setAudience(Collections.singletonList("1054645870882-h5tapu9minrlm1b6bf8p28s24d789007.apps.googleusercontent.com"))
//                    .build();
//
//            // Verify it
//            GoogleIdToken idToken = verifier.verify(token);
//            if (idToken == null) {
//                throw new IllegalAccessException("Invalid id_token");
//            }
//            AuthResponseDto result = new AuthResponseDto().builder()
//                    .token("Усе супер")
//                    .build();
//            return ResponseEntity.ok(result);
//            // Access payload
////            System.out.println("Email: " + idToken.getPayload().getEmail());
//        }
//        catch(Exception ex) {
//            AuthResponseDto result = new AuthResponseDto().builder()
//                    .token("")
//                    .build();
//            return ResponseEntity.ok(result);
//        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> authenticate(
            @RequestBody LoginDto request
    ) {
        var auth = service.login(request);
        if(auth==null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(auth);
    }
}