
    // 眼动仪初始化和校准试次
    var init_camera_trial = {
        type: jsPsychWebgazerInitCamera,
        instructions: `<p style="font-size:30px;line-height: 1.5;">请允许使用摄像头以进行眼动追踪。</p>
        <p style="font-size:30px;line-height: 1.5;">请直接看向摄像头，将头放在网络摄像头的<b>正方形框中间</b>，使摄像头能够看见你的眼睛。
        <br>请调整到舒适的坐姿，并在实验过程中<b>保持头部相对静止</b>。</p>
        <p style="font-size:30px;">当你的脸在框<b>中间</b>且框变为<b>绿色</b>时，即表示摄像头已对准你的脸部，你可以点击继续。</p>
        `,
        button_text: '继续'
    };

    var calibrate_instructions_trial_1 = {
        type: jsPsychHtmlButtonResponse,
        record_data: false,
        stimulus:  `<h2 style="text-align:center;font-size:25px;">接下来我们将进行眼动仪校准。</h2>
        <p style="text-align:center; font-size:25px;">请保持头部稳定</p>`,
        choices: ['继续'],
        };

    var calibrate_instructions_trial_2 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p style="text-align:center; font-size:25px;">请点击屏幕上的点以校准摄像头。</p>',
        choices: "NO_KEYS",
        trial_duration: 2000
    };
    var calibration_trial = {
        type: jsPsychWebgazerCalibrate,
        calibration_points: [
          [25,25],[75,25],[50,50],[25,75],[75,75]
        ],
        repetitions_per_point: 2,
        calibration_mode: 'click',
        randomize_calibration_order: true,
        roi_radius: 150,
    }

    var calibrate_instructions_trial_3 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<p style="text-align:center; font-size:25px;">请持续注视屏幕上的黑点，无需点击。</p>',
        choices: "NO_KEYS",
        trial_duration: 2000
    };

var validation_trial = {
    type: jsPsychWebgazerValidate,
    record_data: true,
    accuracy_threshold: 0.7,
    validation_points: [
        [0, 0],       // 中心
        [-600,-500], // 左上
        [600,-500],  // 右上
        [600, 500],   // 右下
        [-600, 500]   // 左下
    ],
    validation_point_coordinates: 'center-offset-pixels',
    roi_radius: 150, // 半径建议缩小一点，200px太大了，容易让精度差的数据也通过验证
    time_to_saccade: 1000,
    randomize_validation_order: true,
    validation_duration: 2000,
    data: {
      task: 'validate'
    }
};

    var recalibrate_instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus:  `<h2 style="text-align:center;font-size:25px;">测试精准度较低，请重新校准。</h2>
        <p style="text-align:center; font-size:25px;">请保持头部稳定</p>`,
        choices: ['重新校准'],
        };

    var recalibrate = {
        timeline: [recalibrate_instructions, calibrate_instructions_trial_2, calibration_trial, calibrate_instructions_trial_3, validation_trial],
        conditional_function: function(){
            // 改动1: 获取最近一次(last(1))的验证任务数据
            var last_validation_data = jsPsych.data.get().filter({task: 'validate'}).last(1).values()[0];
            
            // 改动2: 安全检查，如果获取不到数据（比如验证失败或未记录），则强制重新校准
            if (!last_validation_data) {
                console.warn("未检测到验证数据，强制重新校准");
                return true; 
            }

            // 改动3: 使用最近的数据进行判断
            return last_validation_data.percent_in_roi.some(function(x){
                var minimum_percent_acceptable = 50;
                return x < minimum_percent_acceptable;
            });
        },
        data: {
            phase: 'recalibration'
        }
    };

      var calibration_done = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
          <p>好的!眼动仪校准完成。</p>
        `,
        choices: ['继续']
      }

    var block_calibration = {
        timeline: [calibrate_instructions_trial_1, 
                calibrate_instructions_trial_2, 
                calibration_trial, 
                calibrate_instructions_trial_3, 
                validation_trial,
                recalibrate,
                calibration_done],
        data: {task: 'calibration_block'}
    }
