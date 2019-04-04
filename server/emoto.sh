#!/bin/bash

emoto_setup_docker(){  
  #Add EMOTO MariaDB
  emoto_setup_log_storage
  docker run \
    --name emoto-docker \
    --restart=unless-stopped \
    --mount source=emoto-log,destination=/usr/local/src/emoto/log \
    -d vivaconagua/emoto:latest 
}

emoto_setup_log_storage(){
  docker volume create emoto-log
}

emoto_rm_log_storage(){
  docker volume rm emoto-log
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

## ToDo: Add DB Scripts
emoto_db_setup_docker (){
  echo "not implemented"
}

emoto_db_remove_docker (){
  echo "not implemented"
}

emoto_db_logs_docker (){
  echo "not implemented"
}

emoto_db_update_docker (){
  echo "not implemented"
}

case $1 in
  setup) emoto_setup_docker ;;
  rm) emoto_remove_docker ;;
  log) emoto_logs_docker ;;
  update) emoto_update_docker ;;
  release) emoto_release ;;
  storage) case $2 in
      setup) emoto_setup_log_storage ;;
      rm) emoto_rm_log_storage ;;
      *)
        echo "Usage: ./emoto.sh log COMMAN"
        echo ""
        echo "Commands:"
        echo "  setup    setup a docker volume for emoto log files"
        echo "  rm       delete the docker volume for emoto log files"
    esac;;
  db) case $2 in 
      setup) emoto_db_setup_docker ;;
      rm) emoto_db_remove_docker ;;
      log) emoto_db_logs_docker ;;
      update) emoto_db_update_docker ;;
      *)
        echo "Usage: ./emoto.sh db COMMAND"
        echo ""
        echo "Comands:"
        echo "  setup    setup a local docker container for emoto database"
        echo "  rm       remove the docker container emoto database"
        echo "  log      print emoto database log"
        echo "  update   update the emoto database docker container to the latest verion"
    esac;;
  *) 
    #ToDo: Add db commands
    echo "Usage: ./emoto.sh COMMAND"
    echo ""
    echo "Commands:"
    echo "  setup    setup a local docker container for emoto"
    echo "  rm       remove the docker container emoto and emoto-db"
    echo "  log      print emoto log"
    echo "  update   update the emoto docker container to the latest verion"
    echo "  release  make a release of the current emoto state"
esac