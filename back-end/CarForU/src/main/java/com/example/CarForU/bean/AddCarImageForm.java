package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

@Getter
@Setter
public class AddCarImageForm {
    private MultipartFile[] cariImage;
    private int carId;

    @Override
    public String toString() {
        return "AddCarImageForm{" +
                "cariImage=" + Arrays.toString(cariImage) +
                ", carId=" + carId +
                '}';
    }

    public AddCarImageForm() {
    }
}
