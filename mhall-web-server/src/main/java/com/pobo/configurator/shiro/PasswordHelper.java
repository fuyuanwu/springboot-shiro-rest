package com.pobo.configurator.shiro;

import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

/**
 * 加密助手类
 */
public class PasswordHelper {
    private static RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();
    private static String algorithmName = "md5";
    private static final int hashIterations = 2;

    public static String generatorSalt() {
        return randomNumberGenerator.nextBytes().toHex();
    }

    public static String encryptPassword(String realPassword, String salt) {
        return new SimpleHash(
                algorithmName,
                realPassword,
                ByteSource.Util.bytes(salt),
                hashIterations).toHex();
    }

    public static String encryptPassword(String realPassword, ByteSource salt) {
        return new SimpleHash(
                algorithmName,
                realPassword,
                salt,
                hashIterations).toHex();
    }
}
