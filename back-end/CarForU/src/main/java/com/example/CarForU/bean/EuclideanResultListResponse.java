package com.example.CarForU.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EuclideanResultListResponse {
    private Object[] euclideanResultEVList;
    private Object[] euclideanResultHybridList;
    private Object[] euclideanResultNormalList;

    public EuclideanResultListResponse() {
    }
}
