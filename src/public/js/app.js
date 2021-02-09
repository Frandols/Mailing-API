      
      // TEXT BOX FUNCTONALITY

      // TEXTBOX
      const iframe = document.querySelector('.frame').contentWindow.document;

      // Rich text buttons and selects functionality
      document.querySelectorAll('.fas').forEach((e) => {
        e.addEventListener('click', () => {
            execCmd(e.name);
            });
        });
        document.querySelectorAll('.select-list').forEach((e) => {
          e.addEventListener('change', () => {
            execCmdArg(e.name, e.value)
          })
        })
        document.getElementById('image-button').addEventListener('click', () => {
          var image = prompt('Insert image URL');
            if(image != ''){
              execCmdArg('insertImage', image)
            }
        })
  

      // Enable iframe edit
      iframe.designMode = 'On';
      
      // Toggling email list on button click
      document.getElementById('drop-emails').onclick = () => {
          document.querySelector('.emails').classList.toggle('emails-active');
      }

      // Commands for rich text without argument
      function execCmd(command){
        iframe.execCommand(command, false, null);
        }

      // Commands for rich text with arguments
      function execCmdArg(command, arg){
        iframe.execCommand(command, false, arg);
        }


        // EMAIL SELECTION

        // Div for displaying mails
        const emails_ul = document.querySelector('.emails ul');

        // Node List of buttons
        const selection_buttons_nodes = document.querySelectorAll('.check-input');

        // Node List to HTML Element Array
        const selection_buttons = Array.from(selection_buttons_nodes);

        // Empty array of all emails
        const emails = new Array();

        // Filling emails array with html elements text content of emails node list
        document.querySelectorAll('.email-data').forEach((e) => {
          emails.push(e.textContent);
        })

        // Array of selected emails
        var selected_emails = new Array();

        // Assigning same statement for each user selection button of the array
        selection_buttons_nodes.forEach((e) => {
          e.onclick = (e) => {
              
              // RENDERING AND SELECTING EMAILS

                  // Getting the email of the user selected 
                  var input = e.target;
                  var index = selection_buttons.indexOf(input);
                  var email = emails[index];

                  // Pushing email on selected emails array when checked
                    if(selection_buttons_nodes[selection_buttons.indexOf(input)].checked){
                      selected_emails.push(email);
                      renderButtonNumber(selected_emails);
                      renderEmailsList(selected_emails);
                    }
                    else{
                      // Deleting email of selected emails array when unchecked
                      selected_emails.splice(selected_emails.indexOf(email), 1);
                      renderButtonNumber(selected_emails);
                      renderEmailsList(selected_emails);
                      return;
                    }
                  }
                })
      function renderButtonNumber(parameter){

        var number = document.querySelector('.number');

        if(parameter.length > 0){
          number.style.display = 'flex';
          number.textContent = parameter.length;
        }
        else{
          number.style.display = 'none';
        }
      
      }

      function renderEmailsList(parameter){

        // Restart List
        emails_ul.innerHTML = '';

        // Write List
        parameter.forEach((e) => {
          var newListElement = document.createElement('li');
          emails_ul.appendChild(newListElement);
          newListElement.textContent = e;
        })
      }

      // EMAIL SENDING

      // Verification
      const credentials_forms_buttons = document.querySelectorAll('.credentials form button');
      
      credentials_forms_buttons.forEach((e) => {
        e.addEventListener('click', (event) => {

          var form = new FormData(e.parentElement);

          if(form.get('name') === '' || !form.get('email').match('@') || !form.get('email').match('.com')){
            alert('Insert valid credentials!');
            event.preventDefault();
            return false;
          }

          if(e === credentials_forms_buttons[1]){

            if(selected_emails.length < 1){
              alert('You have to select an email for send a message!');
              event.preventDefault();
              return false;
            }
            if(iframe.documentElement.innerText === ''){
              alert('You have to write a message!');
              event.preventDefault();
              return false;
            }

          }

        })
      })

      // Set values for sending email list and iframe content
      const emails_hide_input = document.getElementById('emails-hide-input');
      const message_hide_input = document.getElementById('message-hide-input');

      document.querySelectorAll('.credentials form')[1].onsubmit = () => {

        // Set the emails array on an hide input value, then it is sended to sever and it is possible to send the emails
        emails_hide_input.value = selected_emails;

        // The iframe content is setted on the value of an hide input, then it is sended as an string of html to the server
        message_hide_input.value = iframe.documentElement.innerHTML;
      
      }

      // MOBILE MENU

      const menu = document.querySelector('.menu');
      const background = document.querySelector('.dark-bgrd');

      // Menu open animation
      document.getElementById('menu-open').onclick = () => {
        menu.style.right = 0;
        background.style.opacity = '30%';
        background.style.pointerEvents = 'all';
      }
      // Menu close when click on button or in background
      document.getElementById('menu-close').addEventListener('click', menuClose)
      document.querySelector('.dark-bgrd').addEventListener('click', menuClose)

      function menuClose(){
        menu.style.right = '-50%';
        background.style.opacity = 0;
        background.style.pointerEvents = 'none';
      }
      // Scroll to section when click on one of the list elements
      const menu_list_elements = document.querySelectorAll('.menu li');

      menu_list_elements.forEach((e) => {
        e.onclick = () => {
          if (e === menu_list_elements[0]){
            scroll({
              top: 0,
              behavior: 'smooth'
            })
          }
          else{
            scroll({
              top: findPos(document.querySelector(e.attributes.target.nodeValue)) -100,
              behavior: 'smooth'
            })
          }

          menuClose();

        }

      })
      // Function for finding the div position
      function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    }