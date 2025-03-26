package com.example.ums.model.request;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.util.Map;

/**
 * @author pengYuJun
 */
@Data
public class PageRequest {
    /**
     *
     */
    private Long current;
    /**
     *
     */
    private Long pageSize;
}