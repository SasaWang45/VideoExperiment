// Block1_LearningPhase.js

/**
 * 创建并返回Block1的完整时间线，包括预加载。
 * @param {object} jsPsych - 已初始化的 jsPsych 实例。
 * @param {Array} Videos - 视频数据数组。
 * @returns {object} 包含Block1时间线的对象。
 */
function getBlock1Procedure(jsPsych, Videos) {
     // block1 刺激材料准备：过滤 Block1_stims === 1 的视频
    var block1_stims = Videos.filter(function(video) {
        return video.Block1_stims === 1;
    });

    // 提取视频路径用于预加载（假设视频在 ./Videos_exp/ 子目录下）
    var video_paths_block1 = block1_stims.map(function(stim) {
        return stim.Video;  // Prepend directory if needed; remove './Videos_exp/' if videos are in current dir
    });
    
    // 在时间线变量中视频刺激preload
    var preload_videos = {
        type: jsPsychPreload,
        videos: video_paths_block1,
        show_progress_bar: true,
        continue_after_error: false,
        error_message: '视频加载失败，请检查网络连接后重试。'
    };

    var trial_credibility = {
        type: jsPsychVideoButtonResponse,
        autoplay: true,
        controls: false,
        width: 1000,
        stimulus: jsPsych.timelineVariable('VideoArray'),
        prompt: `<p style='font-size:30px'>您认为该视频<b>是</b>或<b>否</b>可信？</p>`,
        choices: ["可信", "不可信"],
        button_label: "提交",
        require_movement: true,
        response_ends_trial: true,
        response_allowed_while_playing: true,
        extensions: [
            {type: jsPsychExtensionWebgazer,
            params: {targets: ['#jspsych-video']}
            }
        ],
        data: {
            task: "learning_phase",
            VideoID: jsPsych.timelineVariable('ID'),
            Authenticity: jsPsych.timelineVariable('Authenticity'),
            Familiarity: jsPsych.timelineVariable('Familiarity')
        }
    };

    var trial_credibility_confidence = {
        type: jsPsychVideoSliderResponse,
        autoplay: false,
        controls: false,
        width: 1000,
        stimulus: jsPsych.timelineVariable('VideoArray'),
        prompt: `<p style='font-size:30px'>您认为该视频的可信/不可信<b>程度</b>有多大？
        <br>请注意，滑动条最左端为50%，最右端为100%，代表您对刚刚所做判断的<b>程度</b>。</p>`,
        labels: ["<span style='font-size':30px'>50%</span>", "<span style='font-size':25px'>100%</span>"],
        button_label: "提交",
        require_movement: true,
        response_ends_trial: true,
        response_allowed_while_playing: true,
        extensions: [
            {type: jsPsychExtensionWebgazer,
            params: {targets: ['#jspsych-video']

            }
            }
        ],
        data: {
            task: "learning_phase",
            VideoID: jsPsych.timelineVariable('ID'),
            Authenticity: jsPsych.timelineVariable('Authenticity'),
            Familiarity: jsPsych.timelineVariable('Familiarity')
        }
    };

    var block1_procedure = {
        timeline: [trial_fixation, trial_credibility,trial_credibility_confidence   ],
        timeline_variables: block1_stims,  // 直接传入过滤后的数组
        randomize_order: true,
        repetitions: 1,
        data: {
            task: "learning_phase"
    }
};
       return block1_procedure;
}