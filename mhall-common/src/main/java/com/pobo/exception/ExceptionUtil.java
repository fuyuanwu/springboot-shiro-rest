package com.pobo.exception;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

public class ExceptionUtil {
    public static String getExceptionStackTrace(Throwable throwable) {
        if (throwable == null) {
            return null;
        }

        try (StringWriter sw = new StringWriter(); PrintWriter printWriter = new PrintWriter(sw);) {
            throwable.printStackTrace(printWriter);
            printWriter.flush();
            sw.flush();
            return sw.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
