export class SignUp {
    constructor(page) {
        this.page = page;
        this.SignUpButton = page.locator('#signin2');

        this.usernameInput = page.locator('#sign-username');
        this.passwordInput = page.locator('#sign-password');

        //<button type="button" onclick="register()" class="btn btn-primary">Sign up</button>
        this.SignUp_form_button = page.locator('button:has-text("Sign up")');
        this.closeButton = page.locator('button:has-text("Close")');
    }

    async goToLogin() {
        await this.page.goto('https://www.demoblaze.com/index.html');
    }

    async registrar(username, password) {
        //<input type="text" class="form-control" id="sign-username" data-listener-added_a4250800="true">
        await this.SignUpButton.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.SignUp_form_button.click();

        this.page.once('dialog', async dialog => { // Cambiado de 'page' a 'this.page'
            console.log('Mensaje del alert:', dialog.message());
            await dialog.accept(); 
        });
    }
}