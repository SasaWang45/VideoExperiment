// Block2_IdentifacePhase.js 

/**
 * 创建并返回Block2的完整时间线，包括预加载。
 * @param {object} jsPsych - 已初始化的 jsPsych 实例。
 * @param {Array} Videos - 视频数据数组。
 * @returns {object} 包含Block2时间线的对象。
 */
function getBlock2Procedure(jsPsych, Videos) {


    // block2 刺激材料准备：过滤 Block2_stims === 1 的视频
    var block2_stims = Videos.filter(function(video) {
        return video.Block2_stims === 1;
    });
    // 提取视频路径用于预加载
    var video_paths_block2 = block2_stims.map(function(stim) {
        return stim.Video;  // Prepend directory if needed; remove './Videos_exp/' if videos are in current dir
    });

    var preload_videos = {
        type: jsPsychPreload,
        videos: video_paths_block2,
        show_progress_bar: true,
        continue_after_error: false,
        error_message: '视频加载失败，请检查网络连接后重试。'
    };

    var trial_identification = {
        type: jsPsychVideoButtonResponse,
        autoplay: true,
        controls: false,
        width: 1000,
        stimulus: jsPsych.timelineVariable('VideoArray'),
        prompt: `<p style='font-size:30px'>您认为该视频<b>是</b>或<b>不是</b>深度伪造</b>。</p>`,
        choices: ["是", "不是"],
        require_movement: true,
        response_ends_trial: true,
        response_allowed_while_playing: true,
        extensions: [
            {type: jsPsychExtensionWebgazer,
            params: {targets: ['#jspsych-video']}
            }
        ],
        data: {
            task: "identification_phase",
            VideoID: jsPsych.timelineVariable('ID'),
            Authenticity: jsPsych.timelineVariable('Authenticity'),
            Familiarity: jsPsych.timelineVariable('Familiarity')
        }
    };

    var trial_identification_confidence = {
        type: jsPsychVideoSliderResponse,
        autoplay: false,
        controls: false,
        width: 1000,
        stimulus: jsPsych.timelineVariable('VideoArray'),
        prompt: `<p style='font-size:30px'>您对您刚才做出的选择有多大程度的<b>自信</b>？</p>
        <p style='font-size:20px'>如果<b>非常自信</b>，请将滑块移向<b>右侧</b>；如果<b>不确定</b>，请将滑块移向<b>左侧</b>。
        <br>请注意，滑动条最左端为<b>50%</b>，最右端为<b>100%</b>，代表您对刚刚所做判断的<b>程度</b>。</p>`,
        labels: ["50%", "100%"],
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
            task: "identification_phase",
            VideoID: jsPsych.timelineVariable('ID'),
            Authenticity: jsPsych.timelineVariable('Authenticity'),
            Familiarity: jsPsych.timelineVariable('Familiarity')
        }
    };

    var block2_procedure = {
        timeline: [trial_fixation, trial_identification,trial_identification_confidence],
        timeline_variables: block2_stims,  // 直接传入过滤后的数组
        randomize_order: true,
        repetitions: 1,
        data: {
            task: "identification_phase"
    }
    };

    return block2_procedure;
}
