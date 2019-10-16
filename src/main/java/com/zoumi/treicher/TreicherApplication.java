package com.zoumi.treicher;

import com.zoumi.treicher.property.ExcelProperty;
import com.zoumi.treicher.property.LoginFilterProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({ExcelProperty.class, LoginFilterProperty.class})
public class TreicherApplication {

    public static void main(String[] args) {
        SpringApplication.run(TreicherApplication.class, args);
    }

}
