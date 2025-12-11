var instruction_trial = {
    type: jsPsychInstructions,
    pages: [
        `<p style="font-size: 40px;">欢迎参加本次实验！</p>`,
        `<p style="font-size: 35px;">在实验开始前，请您仔细阅读以下指导语。</p>
        <p style="font-size: 24px;line-height: 1.5;">本实验将采集您的<b>眼动追踪数据</b>，并仅作为研究用途使用。
        <br>在实验过程中，您将观看一系列短视频，每个视频约10秒，并回答有关问题。
        <br>您将根据直觉判断视频中的<b>人物面孔</b>是否值得信任或是否为深度伪造。
        <br>请您在实验过程中，<b>保持专注</b>，不要打开任何其他程序，保持良好的心态。
        <br>请在一个<b>无人打扰、安静（或佩戴隔音耳机）、采光良好的环境</b>中进行本次实验。
        <br>本次实验预计耗时15分钟，请确认您在接下来的15分钟内连续完成实验。
        <br>若您有任何问题或意见，请随时联系+86-137367578576或发送邮件至2606025493@qq.com。</p>`,
            
        `<p style="font-size: 30px;line-height: 1.5;">请确认您的设备为Chrome浏览器/Microsoft Edge浏览器/Safari浏览器。
        <p style="font-size: 24px;line-height: 1.5;">若您的设备为Chrome浏览器/Microsoft Edge浏览器/Safari浏览器，请点击“下一页”按钮开始实验。</p>
        <p style="font-size: 20px;line-height: 1.5;">若您的设备为其他浏览器，请关闭浏览器，使用Chrome浏览器/FireFox浏览器/Microsoft Edge浏览器/Safari浏览器
        <br>重新打开本网页，再点击“下一页”按钮开始实验。</p>`,
        `<p style="font-size: 35px;line-height: 1.5;">本实验将采集您的<b>眼动追踪数据</b>，并仅作为研究用途使用。
        <br>请确认您的摄像头开启，并允许浏览器访问摄像头。</p>
        <p style="font-size: 24px;line-height: 1.5;">若确认摄像头可访问，请点击“下一页”按钮。</p>`,
        `<p style="font-size: 35px;line-height: 1.5;">请您在实验过程中，请尽量保持您的头部稳定，不要移动或摇动您的头部。</p>
        <p style="font-size: 24px;line-height: 1.5;">若确认理解并同意以上指导语，请点击“下一页”按钮。</p>`
    ],
    show_clickable_nav: true,
    button_label_previous: '上一页',
    button_label_next: '下一页',
    page_label: "第 %current% 页",
    record_data: false
};


var instructions_1 = {
    type: jsPsychInstructions,
    pages: [
        `<p style="font-size: 35px;line-height: 1.5;">本实验一共分为三部分，请按照顺序完成。
        <br>每个部分您将观看一系列短视频，每个视频约10秒，并回答有关问题</p>
        <p style="font-size: 20px;line-height: 1.5;">若确认理解并同意以上指导语，请点击“下一页”按钮。</p>`,

        `<p style="font-size: 30px;line-height: 1.5;">
        <b>第一部分</b>
        <br>您将观看20个短视频，
        <br>请您根据直觉判断：视频中出现的<b>人物面孔</b>是否<span style="font-size: 35px;font-weight: bold;">值得信任</span>？ 
        <br>请选择屏幕下方的<b>按钮</b>来表示您认为视频中的<b>人物面孔</b>是否值得信任。
        <br>请使用屏幕下方的<b>进度条</b>来表示您的判断程度，从“不确定”到“完全可信”/“完全不可信”。
        <br>请尽可能快速、真实地做出反应。
        <br>每个视频只会播放一次，请集中注意力。</p>
        <br>
        <br>
        <p style="font-size: 24px;line-height: 1.5;">若确认理解以上指导语，请点击“下一页”按钮，开始第一部分实验。</p>`,

    ],
    show_clickable_nav: true,
    button_label_previous: '上一页',
    button_label_next: '下一页',
    page_label: "第 %current% 页",
    record_data: false
};

var instruction_detection = {
    type: jsPsychInstructions,
    pages: [
        `<p style="font-size: 35px;line-height: 1.5;">接下来进入第二部分实验！</p>`,
        `<p style="font-size: 24px;line-height: 1.5;">请您仔细阅读下列材料：</p>
        <p style="font-size: 30px;font-weight: bold;">深度伪造(Deepfake)</p>
        <p style="font-size: 25px;line-height: 1.5;">指的是基于深度学习等智能化方法
        <br>创建或合成视听觉内容(如图像、音视频、文本等)。
        <br>近年来，基于深度伪造的换脸技术开始在网络兴起。
        <br>此类技术可将视频中的人脸替换成目标人物，
        <br>从而制作出目标人物做特定动作的假视频。</p>
        <br>
        <br>
        <p style="font-size: 20px;">确认已全部理解可点击“下一页”按钮。</p>`,
        `<p style="font-size: 35px;line-height: 1.5;">第二部分</p>
        <p style="font-size: 30px;line-height: 1.5;">您将继续观看20个短视频。<p>
        <p style="font-size: 30px;line-height: 1.5;">在这些视频中，
        <br>有10个人物的面孔是<b>真实</b>的，10个人物的面孔是<b>深度伪造</b>的。</p>`,

        `<p style="font-size: 30px;line-height: 1.5;">请您根据直觉判断：视频中出现的<b>人物面孔</b>是否为<span style="font-size: 35px;font-weight: bold;">深度伪造</span>？
        <br>请选择屏幕下方的<b>按钮</b>来表示您认为视频中的<b>人物面孔</b>是否为深度伪造。
        <br>请使用屏幕下方的<b>进度条</b>来表示您对您判断的<b>自信程度</b>，从“不确定”到“完全确定”。
        <br>请尽可能快速、真实地做出反应。
        <br>每个视频只会播放一次，请集中注意力。</p>
        <p style="font-size: 24px;line-height: 1.5;">若确认理解以上指导语，请点击“下一页”按钮。</p>`,
    ],
    show_clickable_nav: true,
    button_label_previous: '上一页',
    button_label_next: '下一页',
    page_label: "第 %current% 页",
    record_data: false
};

var instructions_2 = {
    timeline: [instruction_detection],
    randomize_order: false,
    repetitions: 1,
    record_data: false
};

var instructions_3 = {
    type: jsPsychInstructions,
    pages: [
        `<p style="font-size: 35px;line-height: 1.5;">接下来进入第三部分实验！</p>`,
        `<p style="font-size: 30px;line-height: 1.5;">
            <b>第三部分</b>
        <br>您将继续观看40个短视频。
        <br>请您根据直觉判断：视频中出现的<b>人物面孔</b>是否在之前两部分中出现过？ 
        <br>请选择屏幕下方的<b>按钮</b>来表示您认为视频中的<b>人物面孔</b>是否出现过。
        <br>请使用屏幕下方的<b>进度条</b>来表示您对您判断的<b>自信程度</b>，从“不确定”到“完全确定”。</p>`,
        `<p style="font-size: 30px;line-height: 1.5;">此外，您需要再次判断该视频中的<b>人物面孔</b>是否为<span style="font-size: 35px;font-weight: bold;">真实人物</span>或<span style="font-size: 30px;font-weight: bold;">深度伪造</span>。
        <br>请使用屏幕下方的<b>进度条</b>来表示您对您判断的<b>自信程度</b>，从“不确定”到“完全确定”。
        <br>请尽可能快速、真实地做出反应。
        <br>每个视频只会播放一次，请集中注意力。</p>
        <p style="font-size: 24px;line-height: 1.5;">若确认理解以上指导语，请点击“下一页”按钮。</p>`,
    ],
    show_clickable_nav: true,
    button_label_previous: '上一页',
    button_label_next: '下一页',
    page_label: "第 %current% 页",
    record_data: false
};

var instruction_distractor = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `<p style="font-size: 30px;line-height: 1.5;">现在请您玩《吃豆人》游戏。
        <br>游戏时间约为2分钟，请尽情享受游戏过程。</p>`,
    choices: ['开始游戏'],
    record_data: false
};

var instruction_manipulationcheck_1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p style="font-size: 35px;line-height: 1.5;">深度伪造是指？</p>',
    choices: ['<span style="font-size: 25px;line-height: 1.5;">一个人在说谎</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">有人在谈论伪造</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">一个人的面孔/声音<br>经过人工智能技术修改<span>'],
    prompt: "<p>请选择您认为正确的答案。</p>",
    record_data: true
};

var instruction_manipulationcheck_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p style="font-size: 35px;line-height: 1.5;">以下哪一句是正确的？</p>',
    choices: ['<span style="font-size: 25px;line-height: 1.5;">每个视频有20%的概率是深度伪造</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">每个视频有50%的概率是深度伪造</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">所有视频都是深度伪造</span>'],
    prompt: "<p>请选择您认为正确的答案。</p>",
    record_data: true
};

var instruction_manipulationcheck = {
    timeline: [instruction_manipulationcheck_1, instruction_manipulationcheck_2],
    randomize_order: false,
    repetitions: 1
};

// 将操纵检查添加到instructions_2的时间线中
instructions_2.timeline.push(instruction_manipulationcheck);