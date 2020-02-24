# Github actions setup

Actions can be found `htdocs/wp-content/themes/theme-skeletor/.github/workflow/main.yaml` and set the site URL for Browsersync. Use the same URL you're running the

1. The file has these secrets predefined:

- host: `${{ secrets.HOST }}`
- username: `${{ secrets.USERNAME }}`
- password: `${{ secrets.PASSWORD }}`
- port: `${{ secrets.PORT }}`

2. You need to add every secret to your projects repository.
3. Browse to https://github.com/redandbluefi/your-repository
4. Click settings from the "top bar"
5. _Secrets_ can be found from left side navigation
6. Add the 4 secrets mentioned earlier.

#### Example:

Name:
HOST

Value:
finnbrit.fi-p.seravo.com
