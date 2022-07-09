pid=`ps -ef | grep oktools | grep -v grep | awk '{print $2}'`
if [ -z "pid" ];
then
 echo "not found pid of oktools"
else
 echo "found pid of oktools: $pid"
 kill -9 $pid
fi