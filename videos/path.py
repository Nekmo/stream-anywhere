import pathlib

import magic


class Path(type(pathlib.Path())):
    _mimetype = None
    _type = None
    _updated_name = None
    _sort_key = None

    def get_mimetype(self):
        if self.is_dir():
            return 'inode/directory'
        elif self.is_file():
            return magic.from_file(str(self.absolute()), mime=True)

    @property
    def mimetype(self):
        if self._mimetype is None:
            self._mimetype = self.get_mimetype()
        return self._mimetype

    def get_type(self):
        if self.is_dir():
            return 'directory'
        elif self.is_file():
            return 'file'
        elif self.is_socket():
            return 'socket'
        elif self.is_symlink():
            return 'symlink'
        elif self.is_block_device():
            return 'block_device'
        elif self.is_reserved():
            return 'reserved'
        elif self.is_char_device():
            return 'char_device'
        elif self.is_fifo():
            return 'fifo'
        else:
            return 'unknown'

    @property
    def type(self):
        if self._type is None:
            self._type = self.get_type()
        return self._type

    @property
    def is_hidden(self):
        return self.updated_name.startswith('.')

    @property
    def mime(self):
        return (self.mimetype or '').split('/')[0]

    @property
    def updated_name(self):
        return self._updated_name or self.name

    @updated_name.setter
    def updated_name(self, value):
        self._updated_name = value

    @property
    def sort_key(self):
        return self._sort_key or self.name

    @sort_key.setter
    def sort_key(self, value):
        self._sort_key = value
