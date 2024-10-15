{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.openssl.dev
    pkgs.nodejs_20
    pkgs.bun
  ];

  env = { };

  services.docker.enable = true;

  idx = {

    extensions = [
      "vscodevim.vim"
      "BeardedBear.beardedicons"
      "esbenp.prettier-vscode"
      "Llam4u.nerdtree"
      "Prisma.Prisma"
      "teabyii.ayu"
      "humao.rest-client"
      "Supermaven.supermaven"
    ];

    previews = {
      enable = false;
    };

    workspace = {
      onCreate = {
        default.openFiles = [ ".idx/dev.nix" ];
      };

      onStart = {
        git-pull = "git pull";
      };
    };
  };
}
