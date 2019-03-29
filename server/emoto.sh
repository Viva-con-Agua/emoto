#!/bin/bash

emoto_setup_docker(){  
  #Add EMOTO MariaDB
  docker run --name emoto-docker --restart=unless-stopped -d vivaconagua/emoto:latest;
}

emoto_remove_docker(){
  docker rm -f emoto-docker;
}

emoto_logs_docker(){
  docker logs emoto-docker;
}

emoto_update_docker(){
  #docker pull vivaconagua/emoto:latest
  docker rm -f emoto-docker
  emoto_setup_docker;
}

emoto_release(){
  ./make-release.sh
}

case ${@: -1} in
  setup) emoto_setup_docker ;;
  rm) emoto_remove_docker ;;
  log) emoto_logs_docker ;;
  update) emoto_update_docker ;;
  release) emoto_release ;;
  *) 
    echo "Usage: ./emoto.sh COMMAND"
    echo ""
    echo "Commands:"
    echo "  setup    setup a local docker container for emoto and emoto-db"
    echo "  rm       remove the docker container emoto and emoto-db"
    echo "  log      print emoto log"
    echo "  update   update the emoto docker container to the latest verion"
    echo "  release  make a release of the current emoto state"
esac