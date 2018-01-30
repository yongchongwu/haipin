package com.ifuture.haipin.security;

import com.ifuture.haipin.domain.User;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

/**
 * Created by wuyongchong on 2017/7/29.
 */
public class UserPrincipal extends org.springframework.security.core.userdetails.User {

    private final User user;

    public UserPrincipal(String username, String password,
        Collection<? extends GrantedAuthority> authorities, User user) {
        this(username, password, true, true, true, true, authorities, user);
    }

    public UserPrincipal(String username, String password, boolean enabled,
        boolean accountNonExpired,
        boolean credentialsNonExpired, boolean accountNonLocked,
        Collection<? extends GrantedAuthority> authorities, User user) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired,
            accountNonLocked, authorities);
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
