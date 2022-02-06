package com.shakeup.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Comparator;

@Entity
@Data
@Table(name = "copy_video")
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CopyVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int copyid;

    @ManyToOne
    @JoinColumn(name = "original_vid")
    private Videos original;

    @ManyToOne
    @JoinColumn(name = "copy_vid")
    private Videos copy;

    private int uid;

}
