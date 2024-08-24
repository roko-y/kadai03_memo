(function(){
    $(function(){
      var storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
      console.dir(storedEvents);
  
      var calendarEl = $("#calendar")[0];
  
      var calendar = new FullCalendar.Calendar(calendarEl,{
          height: '700px',
          expandRows: true,
          slotMinTime: '08:00',  // 修正: カンマを追加
          slotMaxTime: '20:00',
          headerToolbar:{
            left: 'prev,next today', // 左側に前月・次月・今日ボタンを配置
            center: 'title', // 中央に現在表示している年月を配置
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', // 修正: カンマを追加
          },
          initialView: 'dayGridMonth', // 初期表示のカレンダービューを月表示に設定
          initialDate: '2021-07-15', // カレンダーの初期日付を設定（設定がない場合は本日の日付）
          navLinks: true, // 日付をクリックすると、対応するDayやWeekビューにリンクする設定
          editable: true, // イベントの編集を許可
          selectable: true, // カレンダー上でのドラッグによる範囲選択を許可
          nowIndicator: true, // 現在時間を示すインジケータを表示
          dayMaxEvents: true, // 1日に表示できる最大イベント数を制限し、多すぎる場合は「+n more」で表示
          locale: 'ja', 
  
          eventAdd: function(obj) {
            saveEvents(); // イベントの保存処理を実行
          }, 
          eventChange: function(obj) {
            saveEvents(); // イベントの保存処理を実行
          },
          eventRemove: function(obj) {
            saveEvents(); // イベントの保存処理を実行
          },
          select: function(arg) {
            var title = prompt('Event Title:'); 
            if (title) {
              calendar.addEvent({
                title: title,
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
              });
            } 
            calendar.unselect(); 
          },
  
          eventClick: function(info) {
            if (confirm("このイベントを削除しますか？")) {
              info.event.remove(); // イベントを削除
              saveEvents(); // 削除後の状態を保存
            }
          },
          
          events: storedEvents
       });
  
      calendar.render();
      
      function saveEvents() {
        var events = calendar.getEvents();
        var eventsData = events.map(function(event) {
          return {
            title: event.title, // イベントのタイトル
            start: event.start, // イベントの開始日時
            end: event.end, // イベントの終了日時
            allDay: event.allDay // 終日イベントかどうか
          };
        });
        localStorage.setItem('calendarEvents', JSON.stringify(eventsData));
      }
    });
  })();
  