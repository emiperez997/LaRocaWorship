{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.openssl.dev
  ];

  env = { };

  services.docker.enable = true;

  idx = {
    
    extensions = [
      "BeardedBear.beardedicons"
      "esbenp.prettier-vscode"
      "Llam4u.nerdtree"
      "Prisma.prisma"
      "teabyii.ayu"
    ];

    previews = {
      enable = false;
    };

    workspace = {
      onCreate = {
        default.openFiles = [ ".idx/dev.nix" ];
      };

      onStart = {
        
      };
    };
  };
}
