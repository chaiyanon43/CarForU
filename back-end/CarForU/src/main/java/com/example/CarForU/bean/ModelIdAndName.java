package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
public class ModelIdAndName {
    private String key;
    private String data; //modelName
    private String label; //modelName

    public ModelIdAndName() {
    }
}
