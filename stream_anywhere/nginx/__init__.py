import os
import subprocess


directory = os.path.join(os.path.dirname(os.path.abspath(__file__)))


class ServeNginx:
    def __init__(self, pid_file, config_file=None, config_directory='.', processes=2):
        self.pid_file = pid_file
        self.config_file = config_file or os.path.join(directory, 'nginx.conf.tpl')
        self.config_directory = config_directory
        self.processes = processes

    def run(self):
        subprocess.Popen([
            "/usr/bin/nginx", "-p", self.config_directory, "-c", self.config_file,
            "-g", f"pid {self.pid_file}; worker_processes {self.processes};"
        ])
